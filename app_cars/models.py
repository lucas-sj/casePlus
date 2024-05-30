from django.db import models

class Car(models.Model):
    automakers = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()

    def __str__(self):
        return f"{self.automakers} {self.model} {self.year}"