from rest_framework import serializers
from .models import Note
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'content']
        read_only_fields = ['id']  # We make 'id' read-only as it's usually auto-generated

    def create(self, validated_data):
        """
        Create and return a new Note instance, given the validated data.
        """
        return Note.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing Note instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance