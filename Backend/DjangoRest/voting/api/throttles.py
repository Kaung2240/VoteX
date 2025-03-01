# throttles.py
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


class VoteThrottle(UserRateThrottle):
    scope = 'vote'


class AnonVoteThrottle(AnonRateThrottle):
    scope = 'anon_vote'
