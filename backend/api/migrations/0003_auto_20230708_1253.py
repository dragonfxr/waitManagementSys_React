# Generated by Django 3.2 on 2023-07-08 12:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20230625_2057'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('OrderDetailID', models.AutoField(primary_key=True, serialize=False)),
                ('DishAmount', models.IntegerField(default=1)),
                ('DishPrices', models.FloatField(default=0)),
                ('Comment', models.CharField(max_length=50)),
                ('Start_CookTime', models.TimeField(null=True)),
                ('End_CookTime', models.TimeField(null=True)),
                ('CompleteStatus', models.IntegerField(choices=[(0, 'Not taking the order'), (1, 'Being prepared'), (2, 'Waiting for serving'), (3, 'Serving completed')], default=0)),
            ],
        ),
        migrations.CreateModel(
            name='OrderTable',
            fields=[
                ('OrderID', models.AutoField(primary_key=True, serialize=False)),
                ('TotalAmoubnt', models.IntegerField(default=0)),
                ('TotalPrice', models.FloatField(default=0)),
                ('CreateTime', models.DateTimeField(auto_now_add=True)),
                ('PayTime', models.DateField(null=True)),
                ('PayStatus', models.BooleanField(default=False)),
                ('DishAmount', models.IntegerField(default=0)),
                ('OrderComment', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('TableID', models.IntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='orderdish',
            name='DishForeignID',
        ),
        migrations.RemoveField(
            model_name='orderdish',
            name='OrderForeignID',
        ),
        migrations.AddField(
            model_name='dish',
            name='CostTime',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderDish',
        ),
        migrations.AddField(
            model_name='ordertable',
            name='TableID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.table'),
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='DishForeignID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.dish'),
        ),
        migrations.AddField(
            model_name='orderdetail',
            name='OrderForeignID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ordertable'),
        ),
    ]
