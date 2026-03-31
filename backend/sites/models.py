from django.db import models
from django.utils.text import slugify


class EarningMethod(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)

    class Meta:
        verbose_name_plural = "Earning Methods"

    def __str__(self):
        return self.name


class PayoutMethod(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=2)
    is_nigeria = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class EarningSite(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('low_paying', 'Low Paying'),
        ('avoid', 'Avoid'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    url = models.URLField()
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    description = models.TextField(blank=True)

    earning_methods = models.ManyToManyField(EarningMethod, related_name='sites')
    payout_methods = models.ManyToManyField(PayoutMethod, related_name='sites')
    minimum_payout = models.DecimalField(max_digits=10, decimal_places=2)
    average_earnings = models.CharField(max_length=100, blank=True)

    countries = models.ManyToManyField(Country, related_name='sites')
    is_nigeria_available = models.BooleanField(default=False)
    is_lagos_focused = models.BooleanField(default=False)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    last_verified = models.DateField()
    verification_notes = models.TextField(blank=True)

    is_featured = models.BooleanField(default=False)
    affiliate_link = models.URLField(blank=True)
    signup_instructions = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
