from django.db import models
from Auth.models import CustomUser

class Note(models.Model):
    user = models.ForeignKey(CustomUser , on_delete=models.CASCADE)
    title = models.CharField(max_length=1000)
    content = models.TextField()

    def __str__(self):
        return self.title