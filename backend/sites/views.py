from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import EarningSite, EarningMethod, PayoutMethod, Country
from .serializers import (
    EarningSiteSerializer,
    EarningMethodSerializer,
    PayoutMethodSerializer,
    CountrySerializer,
)


class EarningSiteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EarningSite.objects.filter(status='active')
    serializer_class = EarningSiteSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by earning method
        methods = self.request.query_params.get('methods')
        if methods:
            queryset = queryset.filter(earning_methods__slug__in=methods.split(','))
        
        # Filter by payout method
        payouts = self.request.query_params.get('payouts')
        if payouts:
            queryset = queryset.filter(payout_methods__slug__in=payouts.split(','))
        
        # Filter by Nigeria availability
        nigeria = self.request.query_params.get('nigeria')
        if nigeria == 'true':
            queryset = queryset.filter(is_nigeria_available=True)
        
        # Filter by Lagos focus
        lagos = self.request.query_params.get('lagos')
        if lagos == 'true':
            queryset = queryset.filter(is_lagos_focused=True)
        
        # Filter by minimum payout
        min_payout = self.request.query_params.get('min_payout')
        if min_payout:
            queryset = queryset.filter(minimum_payout__lte=float(min_payout))
        
        # Search by name
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search))
        
        return queryset.distinct()


class FeaturedSitesView(generics.ListAPIView):
    serializer_class = EarningSiteSerializer

    def get_queryset(self):
        return EarningSite.objects.filter(is_featured=True, status='active')[:6]


class EarningMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EarningMethod.objects.all()
    serializer_class = EarningMethodSerializer


class PayoutMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PayoutMethod.objects.all()
    serializer_class = PayoutMethodSerializer


class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


@api_view(['GET'])
def filters_view(request):
    """Get all filter options"""
    methods = EarningMethodSerializer(EarningMethod.objects.all(), many=True)
    payouts = PayoutMethodSerializer(PayoutMethod.objects.all(), many=True)
    countries = CountrySerializer(Country.objects.all(), many=True)
    
    return Response({
        'earning_methods': methods.data,
        'payout_methods': payouts.data,
        'countries': countries.data,
        'statuses': [
            {'value': 'active', 'label': 'Active'},
            {'value': 'low_paying', 'label': 'Low Paying'},
            {'value': 'avoid', 'label': 'Avoid'},
            {'value': 'closed', 'label': 'Closed'},
        ],
    })


@api_view(['GET'])
def health_view(request):
    return Response({'status': 'ok'})
