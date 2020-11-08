import string
import os


def preprocess(content):
        # makes a copy of the "self.content"
        cleaned_content = content[:]
        # makes every character lowercase
        cleaned_content = cleaned_content.lower()
        # removes all punctuation from string
        for punctuation in string.punctuation:
            cleaned_content = cleaned_content.replace(punctuation, "")
        # removes all numbers from string
        for digit in string.digits:
            cleaned_content = cleaned_content.replace(digit, "")
        # reduces multiple spaces to a single space
        cleaned_content = " ".join(cleaned_content.split())
        return cleaned_content

def get_useful_words(cleaned_content):
        file = open(os.path.join(os.getcwd(), "Stopwords.txt"), 'r',
                    encoding="utf8")
        stop_words = file.read()
        # removes all next line spacing
        stop_words = stop_words.replace("\n", " ")
        # retrieves list of stop words from file
        stop_words = stop_words.split(" ")
        useful_word_list = []  # dummy assignment
        # breaks string into words
        word_list = cleaned_content.split(" ")
        # iterates through list of words to find if there is a match with a word from stop_words.
        # if match is found, iteration stops and moves onto next word
        # if match is not found, word is inserted into useful_word_list
        for word in word_list:
            match = False
            index = 0
            while match is False and index < len(stop_words):
                if stop_words[index] == word:
                    match = True
                else:
                    index += 1
            if match is False:
                useful_word_list.append(word)
        return useful_word_list
