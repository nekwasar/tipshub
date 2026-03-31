from django.contrib import admin
from .models import EarningSite, EarningMethod, PayoutMethod, Country


@admin.register(EarningSite)
class EarningSiteAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'minimum_payout', 'is_nigeria_available', 'is_featured', 'last_verified']
    list_filter = ['status', 'is_nigeria_available', 'is_lagos_focused', 'is_featured', 'earning_methods', 'payout_methods']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    date_hierarchy = 'last_verified'


@admin.register(EarningMethod)
class EarningMethodAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(PayoutMethod)
class PayoutMethodAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'is_nigeria']
    list_filter = ['is_nigeria']
