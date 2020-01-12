from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class Organization(models.Model):

    name = models.CharField(_("name"), max_length=100, unique=True, db_index=True)
    date_created = models.DateTimeField(_("date_created"), auto_now=False, auto_now_add=True)
    date_modified = models.DateTimeField(_("date_modified"), auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name = _("Organization")
        verbose_name_plural = _("Organizations")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("organization_detail", kwargs={"pk": self.pk})


class UserProfile(models.Model):
    user = models.OneToOneField(User, verbose_name=_("user"), on_delete=models.CASCADE, unique=True)
    organization = models.ForeignKey(Organization, verbose_name=_("organization"), on_delete=models.CASCADE, null=False, blank=False)

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

    def __str__(self):
        return str(self.user)

    @property
    def full_name(self):
        return self.user.get_full_name()

    def get_absolute_url(self):
        return reverse("userprofile_detail", kwargs={"pk": self.pk})
