# from django.http import JsonResponse
# from .models import User
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def search_users(request):
#     if request.method == 'GET':
#         query = request.GET.get('query', '')
#         if query:
#             users = User.objects.filter(first_name__icontains=query)  # Modify according to your search needs
#             users_data = [{
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'city': user.city,
#                 'contact_number': user.contact_number,
#             } for user in users]
#             return JsonResponse({'results': users_data}, safe=False)
#         else:
#             return JsonResponse({'error': 'No search term provided'}, status=400)
#     return JsonResponse({'error': 'Invalid request method'}, status=405)


# from django.http import JsonResponse
# from .models import User
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def search_users(request):
#     if request.method == 'GET':
#         search = request.GET.get('search', '')
#         if search:
#             users = User.objects.filter(first_name__icontains=search) | User.objects.filter(last_name__icontains=search) | User.objects.filter(city__icontains=search)
#             users_data = [{
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'city': user.city,
#                 'contact_number': user.contact_number,
#             } for user in users]
#             return JsonResponse({'results': users_data}, safe=False)
#         else:
#             return JsonResponse({'error': 'No search term provided'}, status=400)
#     return JsonResponse({'error': 'Invalid request method'}, status=405)



from django.http import JsonResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

@csrf_exempt
def search_users(request):
    if request.method == 'GET':
        query = request.GET.get('query', '').strip()
        if query:
            # Use Q objects to search across multiple fields
            users = User.objects.filter(
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(city__icontains=query) |
                Q(contact_number__icontains=query)
            )
            # Serialize the user data
            users_data = [{
                'first_name': user.first_name,
                'last_name': user.last_name,
                'city': user.city,
                'contact_number': user.contact_number,
            } for user in users]
            return JsonResponse({'results': users_data}, safe=False)
        else:
            return JsonResponse({'error': 'No search term provided'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
