from django.contrib import admin
from socialapp.models import (
    Profile,Post,Like,Comment,Reply,Comment,friendRequest
)
# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Reply)
admin.site.register(friendRequest)