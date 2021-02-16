from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    bio=models.TextField(blank=True,null=True)
    image=models.ImageField(default='image/profile.png',upload_to='image/')
    friends=models.ManyToManyField(User,related_name='friends',blank=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        Token.objects.create(user=instance)

class Post(models.Model):
    profile=models.ForeignKey(Profile, on_delete=models.CASCADE)
    title=models.CharField(max_length=100)
    content=models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to='posts/',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Like(models.Model):
    profile=models.ForeignKey(Profile,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    like=models.BooleanField(default=False)

class Comment(models.Model):
    profile=models.ForeignKey(Profile,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,on_delete=models.CASCADE)
    title=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    profile=models.ForeignKey(Profile, on_delete=models.CASCADE)
    comment=models.ForeignKey(Comment, on_delete=models.CASCADE)
    title=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)


class friendRequest(models.Model):
    sender=models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='sender')
    receiver=models.ForeignKey(Profile,on_delete=models.CASCADE, related_name='receiver')
    created_at=models.DateTimeField(auto_now_add=True)