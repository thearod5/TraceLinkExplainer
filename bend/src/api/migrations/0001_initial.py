# Generated by Django 3.1.4 on 2020-12-13 18:13

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artifact',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=4096)),
                ('body', models.CharField(max_length=1000000)),
            ],
            options={
                'ordering': ['project', 'type', 'name'],
            },
        ),
        migrations.CreateModel(
            name='ArtifactType',
            fields=[
                ('name', models.CharField(max_length=4096, primary_key=True, serialize=False, unique=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Trace',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source', to='api.artifact')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target', to='api.artifact')),
            ],
            options={
                'unique_together': {('source', 'target')},
            },
        ),
        migrations.CreateModel(
            name='ProjectDescription',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=4096)),
                ('description', models.CharField(max_length=1000000)),
            ],
            options={
                'ordering': ['name'],
                'unique_together': {('name',)},
            },
        ),
        migrations.AddField(
            model_name='artifact',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.projectdescription'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='traces',
            field=models.ManyToManyField(to='api.Trace'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.artifacttype'),
        ),
        migrations.AlterUniqueTogether(
            name='artifact',
            unique_together={('project', 'type', 'name')},
        ),
    ]
