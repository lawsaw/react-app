class AdvancedModelConverter(CustomModelConverter):
def __init__(self, *args, **kwargs):
super().__init__(*args, **kwargs)
self.converters[FileField] = self.handle_file
self.converters[MarkdownTextField] = self.handle_dtext

def handle_file(self, model, field, **kwargs):
# kwargs['widget'] = form.DatePickerWidget()
return field.name, MygwFileUploadField(**kwargs)

def handle_dtext(self, model, field, **kwargs):
# kwargs['widget'] = form.DatePickerWidget()
return field.name, PageDownField(**kwargs)

class AdvancedModelView(ModelView):
model_form_converter = AdvancedModelConverter


class AdvancedModelView(ModelView):
model_form_converter = AdvancedModelConverter

class BlogModelView(AdvancedModelView):
column_hide_backrefs = False
form_args = dict(cover=dict(validators=[image_validation]))
inline_models = (ProductImageInlineModelForm(models.BlogImage),
        InlineFormAdmin(models.BlogTranslation),
        InlineFormAdmin(models.BlogTag),
)
column_labels = {'blogimage_set': 'Image',
    'blogtranslation_set': 'Translation'}