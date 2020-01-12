import datetime
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import pre_save
from accounts.models import UserProfile, Organization
# Create your models here.


class Kudos(models.Model):
    body = models.TextField(_("body"), null=False, blank=False)
    from_user = models.ForeignKey(UserProfile, verbose_name=_("from_user"), on_delete=models.CASCADE, null=False, blank=False, related_name="kudos_from_user")
    to_user = models.ForeignKey(UserProfile, verbose_name=_("to_user"), on_delete=models.CASCADE, null=False, blank=False, related_name="kudos_to_user")
    created_date = models.DateTimeField(_("created_date"), default=datetime.datetime.now(), editable=False)
    modified_date = models.DateTimeField(_("modified_date"), auto_now=True)
    week_year = models.CharField(_("week_year"), max_length=6, editable=False)


    class Meta:
        verbose_name = _("kudos")
        verbose_name_plural = _("kudos")
        indexes = [
            models.Index(fields=['week_year', 'from_user']),
        ]

    def __str__(self):
        return self.body

    def get_absolute_url(self):
        return reverse("kudos_detail", kwargs={"pk": self.pk})

    def clean(self):
        current_week_year = f"{self.created_date.isocalendar()[1]:02d}{self.created_date.isocalendar()[0]}"
        # check max 3 kudos per user per week rule is not violated
        kudos = Kudos.objects.filter(week_year=current_week_year, from_user=self.from_user)
        if len(kudos) >= 3:
            raise ValidationError("A user can only give 3 kudos per week.")


    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.full_clean()
        self.week_year = f"{self.created_date.isocalendar()[1]:02d}{self.created_date.isocalendar()[0]}"
        return super(Kudos, self).save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
