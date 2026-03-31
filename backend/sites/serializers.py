from rest_framework import serializers
from .models import EarningSite, EarningMethod, PayoutMethod, Country


class EarningMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = EarningMethod
        fields = ['id', 'name', 'slug', 'icon']


class PayoutMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayoutMethod
        fields = ['id', 'name', 'slug', 'icon']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'code', 'is_nigeria']


class EarningSiteSerializer(serializers.ModelSerializer):
    earning_methods = EarningMethodSerializer(many=True, read_only=True)
    payout_methods = PayoutMethodSerializer(many=True, read_only=True)
    countries = CountrySerializer(many=True, read_only=True)

    class Meta:
        model = EarningSite
        fields = [
            'id', 'name', 'slug', 'url', 'logo', 'description',
            'earning_methods', 'payout_methods', 'minimum_payout', 'average_earnings',
            'countries', 'is_nigeria_available', 'is_lagos_focused',
            'status', 'last_verified', 'verification_notes',
            'is_featured', 'affiliate_link', 'signup_instructions',
            'created_at', 'updated_at'
        ]
