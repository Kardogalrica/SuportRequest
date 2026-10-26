import { storage } from '../../../infra/localStorage'
import { GenerateId } from '../../../infra/GenerateId'

export const SuportRequests = {
    data: [],

    key:'SuportRequests',

    init() {
        var raw = storage.get(this.key)

        if(Array.isArray(raw) 
            && raw.every(e => typeof e.Id === 'number' 
                && typeof e.applicantName === 'string' 
                && typeof e.applicantEmail === 'string' 
                && typeof e.department === 'string' 
                && typeof e.category === 'string' 
                && typeof e.priority === 'string' 
                && typeof e.subject === 'string' 
                && typeof e.description === 'string' 
                && typeof e.assetReference === 'string' 
                && typeof e.occurrenceDate === 'string' 
                && typeof e.ticket === 'string' 
                && typeof e.status === 'string' )
        ) {
            this.data = storage.get(this.key)   
        } else {
            storage.remove(this.key)
            this.data = []
            throw new Error('LocalStorage SuportRequests cumrompida')            
        }
    },

    update(NewData) {
        if(Array.isArray(NewData) 
            && NewData.every(e => typeof e.Id === 'number' 
                && typeof e.applicantName === 'string' 
                && typeof e.applicantEmail === 'string' 
                && typeof e.department === 'string' 
                && typeof e.category === 'string' 
                && typeof e.priority === 'string' 
                && typeof e.subject === 'string' 
                && typeof e.description === 'string' 
                && typeof e.assetReference === 'string' 
                && typeof e.occurrenceDate === 'string' 
                && typeof e.ticket === 'string' 
                && typeof e.status === 'string'
            )) {
            storage.set(this.key, NewData)
        } else {
            throw new Error('Erro ao Gravar SuportRequests, Dados cumrompidos')  
        }
    }

}

export function RecordSuportRequest() {
    this.record = null

    this.recordInit = {
            Id:0,
            applicantName: 'Joana Silva',
            applicantEmail: 'joana.silva@empresa.pt',
            department: '',
            category: '',
            priority: 'Média',
            subject: '',
            description: '',
            assetReference: '',
            occurrenceDate: '',
            attachments: [],
            ticket:'',
            status:'Rascunho'
    }

    this.init = function(id) {
        if(id === 0) {
            this.record = {...this.recordInit}
        } else {
            SuportRequests.init()
            var p = SuportRequests.data
            const found = p.find(el => el.Id === id)
            this.record = found ? { ...found } : {}
        }

    }

    this.refresh = function() {
        this.init(this.record.Id)
    }

    this.getId = function() {
        if(this.record.Id === 0) {
            SuportRequests.init()
            const p = SuportRequests.data
            return GenerateId.getId(p)  
        } else {
            return this.record.Id
        }

    }

    this.setRecord = function(record) {
        if (
            !record
            || typeof record.Id !== 'number'
            || typeof record.applicantName !== 'string'
            || typeof record.applicantEmail !== 'string'
            || typeof record.department !== 'string'
            || typeof record.category !== 'string'
            || typeof record.priority !== 'string'
            || typeof record.subject !== 'string'
            || typeof record.description !== 'string'
            || typeof record.assetReference !== 'string'
            || typeof record.occurrenceDate !== 'string'
            || !Array.isArray(record.attachments)
            || typeof record.ticket !== 'string'
            || typeof record.status !== 'string'
        ) {
            throw new Error('Tentativa de atribuir valores inválidos')
        }

        this.record = {
            ...record,
            attachments: [...record.attachments]
        }
    }

    this.save = function(callback) {
        if (!this.record) {
            throw new Error('Não existe registro de suporte para guardar')
        }

        this.record.Id = this.getId()

        // garante estado atualizado
        SuportRequests.init()
        const p = SuportRequests.data

        // busca índice corretamente
        const i = p.findIndex(e => e.Id === this.record.Id)

        if (i === -1) {
            p.push(this.record) // novo registro
        } else {
            p[i] = this.record // atualiza existente
        }

        SuportRequests.update(p) // salva no localStorage

        if (callback instanceof Function) { callback(); }
    }
}