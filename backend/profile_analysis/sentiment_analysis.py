from apiclient.discovery import build
from google.cloud import language_v1
import numpy as np
from textblob import TextBlob
from time import sleep
import os
# from preprocess import preprocess, get_useful_words

def analyze_google_sentiment(text_content):
    """
    Analyzing Sentiment in a String

    Args:
      text_content The text content to analyze
    """
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join(os.getcwd(), 'profile_analysis','yhack-55a358192c91.json')

    

    service = build('language', 'v1', developerKey='AIzaSyBkpse_KLTykTiGr5r3Oo_RMu939EuQX9Q')                
    collection = service.documents()

    # language = "en"
    # document = {"content": text_content, "type_": type_, "language": language}

    # encoding_type = language_v1.EncodingType.UTF8
    # response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    
    data = {}
    data['document'] = {}
    data['document']['language'] = 'en'
    data['document']['content'] = text_content
    data['document']['type'] = 'PLAIN_TEXT'

    request = collection.analyzeSentiment(body=data)
    res = request.execute()
    return res['documentSentiment']['score']


def find_sentiments(cleaned_keywords):
    '''
    This function calculates the sentiment polarity and subjectivities of a tweet using textblob
    :param Clean_tweet: The cleaned, scrubbed tweet to be analysed
    :return: polarity value [-1, 1] and subjectivity value [0, 1]
    '''

    blob = TextBlob(str(cleaned_keywords))
    polarity, subjectivity = blob.sentiment
    
    return subjectivity

if __name__ == "__main__":
    text = ""
    print(analyze_google_sentiment(""))
    # cleaned_text = preprocess(text)
    # keywords = get_useful_words(cleaned_text)
    # print(cleaned_text)
    # print(keywords)
    print(find_sentiments(text))
