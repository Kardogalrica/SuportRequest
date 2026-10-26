export function updateField(setForm, setErrors, field, value) {
  setForm((currentForm) => ({
    ...currentForm,
    [field]: value,
    ticket: ''
  }))

  setErrors((currentErrors) => ({
    ...currentErrors,
    [field]: {
      MenssagemErro: '',
      IsValid: true
    }
  }))
}
