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


def search_car(request):
    if request.method == 'GET':
        automaker = request.GET.get('automaker', '')
        model = request.GET.get('model', '')
        year = request.GET.get('year', '')

        cars = Car.objects.all()
        if automaker:
            cars = cars.filter(automakers__icontains=automaker)
        if model:
            cars = cars.filter(model__icontains=model)
        if year:
            cars = cars.filter(year=year)

        car_list = list(cars.values('id', 'automakers', 'model', 'year'))

        return JsonResponse({'status': 'success', 'cars': car_list})
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)