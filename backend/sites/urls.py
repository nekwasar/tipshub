from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'sites', views.EarningSiteViewSet, basename='site')
router.register(r'methods', views.EarningMethodViewSet, basename='method')
router.register(r'payouts', views.PayoutMethodViewSet, basename='payout')
router.register(r'countries', views.CountryViewSet, basename='country')

urlpatterns = [
    path('', include(router.urls)),
    path('sites/featured/', views.FeaturedSitesView.as_view(), name='featured-sites'),
    path('filters/', views.filters_view, name='filters'),
    path('health/', views.health_view, name='health'),
]
