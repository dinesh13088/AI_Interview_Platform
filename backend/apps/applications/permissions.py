# # applications/permissions.py
# from rest_framework import permissions


# import logging
# logger = logging.getLogger(__name__)

# class IsRecruiter(permissions.BasePermission):
#     def has_permission(self, request, view):
#         user = request.user
#         logger.info(f"User: {user}, authenticated: {user.is_authenticated}, role: {getattr(user, 'role', None)}, has_profile: {hasattr(user, 'candidates_profile')}")
#         return (
#             user.is_authenticated
#             and user.role == 'candidate'
#             and hasattr(user, 'candidates_profile')
#         )


# class IsCandidate(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return (
#             request.user.is_authenticated
#             and request.user.role == 'candidate'
#             and hasattr(request.user, 'candidates_profile')
#         )