def match_users(user, avail_users):
    for _, details in user[1]:
        user_data = details
    user_email = user[0]
    user_interests = set(user_data['interest'])
    user_polarity_scores = user_data['messages-polarity']
    user_subjectivity_scores = user_data['messages-subjectivity']
    for avail_user in avail_users:
        avail_user_data = avail_user['details']
        avail_user_email = avail_user['email']
        avail_user_interests = set(avail_user_data['interest'])
        interest_intersection = avail_user_interests & user_interests
        if len(interest_intersection) < 3:
            continue
        avail_user_polarity_scores = avail_user_data['messages-polarity']
        avail_user_subjectivity_scores = avail_user_data['messages-subjectivity']
        diff_polarity_scores = [abs(a-b) for a, b in zip(avail_user_polarity_scores, user_polarity_scores) if abs(a-b) > 0.75]
        # diff_polarity_scores = [abs(a-b) for a, b in zip(avail_user_polarity_scores, user_polarity_scores)]
        diff_subjectivity_scores = [abs(a-b) for a, b in zip(avail_user_subjectivity_scores, user_subjectivity_scores) if abs(a-b) < 0.35]
        # diff_subjectivity_scores = [abs(a-b) for a, b in zip(avail_user_subjectivity_scores, user_subjectivity_scores)]
        # print('diff_polarity_scores', diff_polarity_scores)
        # print('diff_subjectivity_scores', diff_subjectivity_scores)
        if len(diff_polarity_scores) < 3 or len(diff_subjectivity_scores) < 2:
            continue
        return avail_user_email
    return None