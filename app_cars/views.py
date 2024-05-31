from django.shortcuts import render
from django.http import JsonResponse
from .models import Car
import json


def home_page(request):
    return render(request, 'base.html')


def add_car(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            automaker = data.get('automaker')
            model = data.get('model')
            year = data.get('year')
            car_id = data.get('id_car')

            if automaker == "" or model == "" or year == "":
                return JsonResponse({'status': 'error', 'message': 'Todos os campos são obrigatórios'}, status=400)

            if car_id: # Se houver um ID, trata-se de uma atualização
                car = Car.objects.get(pk=car_id)
                car.automakers = automaker
                car.model = model
                car.year = year
                car.save()
            else: # é uma criação
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


def delete_car(request):
    if request.method == 'DELETE':
        try:
            ids = request.GET.getlist('ids')
            if not ids:
                return JsonResponse({'status': 'error', 'message': 'Nenhum ID fornecido'}, status=400)
            Car.objects.filter(id__in=ids).delete()
            return JsonResponse({'status': 'success', 'message': 'Carros deletados com sucesso'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)
