export function validateSupportRequest(form) {
  const nextErrors = {
    department:{MenssagemErro:'', IsValid:true},
    category:{MenssagemErro:'', IsValid:true},
    priority:{MenssagemErro:'', IsValid:true},
    subject:{MenssagemErro:'', IsValid:true},
    description:{MenssagemErro:'', IsValid:true},
    occurrenceDate:{MenssagemErro:'', IsValid:true},
    assetReference:{MenssagemErro:'', IsValid:true},
    attachments:{MenssagemErro:'', IsValid:true}
  }
  const today = new Date().toISOString().split('T')[0]
  const requiredText = (value) => value?.trim() ?? ''

  const department = requiredText(form.department)
  const category = requiredText(form.category)
  const priority = requiredText(form.priority)
  const subject = requiredText(form.subject)
  const description = requiredText(form.description)
  const assetReference = requiredText(form.assetReference)
  const attachments = Array.isArray(form.attachments) ? form.attachments : []
  const isCriticalPriority = priority === 'Crítica'
  const minDescriptionLength = isCriticalPriority ? 100 : 20
  const hasShortDescription = description && description.length < minDescriptionLength


  if (!department) {
    nextErrors.department.MenssagemErro = 'Campo obrigatório.'
    nextErrors.department.IsValid = false
  }

  if (!category) {
    nextErrors.category.MenssagemErro = 'Campo obrigatório.'
    nextErrors.category.IsValid = false
  }

  if (!priority) {
    nextErrors.priority.MenssagemErro = 'Campo obrigatório.'
    nextErrors.priority.IsValid = false
  }

  if (!subject) {
    nextErrors.subject.MenssagemErro = 'Campo obrigatório.'
    nextErrors.subject.IsValid = false
  }

  if (!description) {
    nextErrors.description.MenssagemErro = 'Campo obrigatório.'
    nextErrors.description.IsValid = false
  } else if (hasShortDescription) {
    let descriptionLengthError = 'A descrição deve conter pelo menos 20 caracteres.'

    if (isCriticalPriority) {
      descriptionLengthError = 'Para prioridade crítica, descreva o problema com pelo menos 100 caracteres.'
    }

    nextErrors.description.MenssagemErro = descriptionLengthError
    nextErrors.description.IsValid = false
  }

  if (!form.occurrenceDate) {
    nextErrors.occurrenceDate.MenssagemErro = 'Campo obrigatório.'
    nextErrors.occurrenceDate.IsValid = false
  } else if (form.occurrenceDate > today) {
    nextErrors.occurrenceDate = 'A data não pode ser futura.'
    nextErrors.occurrenceDate.IsValid = false
  }

  if (category === 'Acesso e Permissões' && !assetReference) {
    nextErrors.assetReference.MenssagemErro = 'Indique o equipamento afetado para esta categoria.'
    nextErrors.assetReference.IsValid = false
  }

  if (attachments.length > 5) {
    nextErrors.attachments.MenssagemErro = 'Número máximo de anexos excedido.'
    nextErrors.attachments.IsValid = false
  } else  if (attachments.some((file) => file.size > 10 * 1024 * 1024)) {
    nextErrors.attachments.MenssagemErro = 'Cada ficheiro deve ter no máximo 10 MB.'
    nextErrors.attachments.IsValid = false
  }

  return nextErrors
}
