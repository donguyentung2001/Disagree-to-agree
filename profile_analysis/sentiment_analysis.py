from google.cloud import language_v1
import numpy as np
from textblob import TextBlob
from time import sleep
import os
from preprocess import preprocess, get_useful_words
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def analyze_google_sentiment(text_content):
    """
    Analyzing Sentiment in a String

    Args:
      text_content The text content to analyze
    """

    client = language_v1.LanguageServiceClient()

    type_ = language_v1.Document.Type.PLAIN_TEXT

    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    # Get overall sentiment of the input document
    # print(u"Document sentiment score: {}".format(response.document_sentiment.score))
    # print(
    #     u"Document sentiment magnitude: {}".format(
    #         response.document_sentiment.magnitude
    #     )
    # )
    return response.document_sentiment.score


def find_sentiments(cleaned_keywords):
    '''
    This function calculates the sentiment polarity and subjectivities of a tweet using textblob
    :param Clean_tweet: The cleaned, scrubbed tweet to be analysed
    :return: polarity value [-1, 1] and subjectivity value [0, 1]
    '''

    analyzer = SentimentIntensityAnalyzer()
    blob = TextBlob(str(cleaned_keywords))
    polarity, subjectivity = blob.sentiment
    if polarity == 0:
        vader_op = analyzer.polarity_scores(cleaned_keywords)
        polarity = vader_op['compound']
    return subjectivity

if __name__ == "__main__":
    text = "I am so happy and joyful."
    print(analyze_google_sentiment("I am so happy and joyful."))
    # cleaned_text = preprocess(text)
    # keywords = get_useful_words(cleaned_text)
    # print(cleaned_text)
    # print(keywords)
    print(find_sentiments(text))
