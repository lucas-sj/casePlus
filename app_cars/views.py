from django.shortcuts import render
from django.http import JsonResponse
from .models import Car
import json


def home_page(request):
    return render(request, 'base.html')


def add_car(request):
    if request.method == 'POST':
        print(request.body)
        try:
            data = json.loads(request.body)
            automaker = data.get('automaker')
            model = data.get('model')
            year = data.get('year')
            if automaker == "" or model == "" or year == "":
                print("chegou no if")
                return JsonResponse({'status': 'error', 'message': 'Todos os campos são obrigatórios'}, status=400)

            car = Car(automakers=automaker, model=model, year=year)
            car.save()

            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)
