import { storage } from '../../../infra/localStorage'
import { GenerateId } from '../../../infra/GenerateId'

export const Users = {
    data: [],

    key:'Users',

    init() {
        var raw = storage.get(this.key)

        if(Array.isArray(raw) 
            && raw.every(e => typeof e.Id === 'number' 
                && typeof e.Name === 'string' 
                && typeof e.Email === 'string' 
                && typeof e.PassWord === 'string')
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
                && typeof e.Name === 'string' 
                && typeof e.Email === 'string' 
                && typeof e.PassWord === 'string' 
            )) {
            storage.set(this.key, NewData)
        } else {
            throw new Error('Erro ao Gravar SuportRequests, Dados cumrompidos')  
        }
    }

}

export function RecordUser() {
    this.record = null

    this.recordInit = {
            Id:0,
            Name: 'Joana Silva',
            Email: 'joana.silva@empresa.pt',
            PassWord: '',
            roles: [],
    }

    this.init = function(id) {
        if(id === 0) {
            this.record = {...this.recordInit}
        } else {
            Users.init()
            var p = Users.data
            const found = p.find(el => el.Id === id)
            this.record = found ? { ...found } : {}
        }

    }

    this.refresh = function() {
        this.init(this.record.Id)
    }

    this.getId = function() {
        if(this.record.Id === 0) {
            Users.init()
            const p = Users.data
            return GenerateId.getId(p)  
        } else {
            return this.record.Id
        }

    }

    this.setRecord = function(record) {
        if (
            !record
            || typeof record.Id !== 'number'
            || typeof record.Name !== 'string'
            || typeof record.Email !== 'string'
            || typeof record.PassWord !== 'string'
            || !Array.isArray(record.roles)
        ) {
            throw new Error('Tentativa de atribuir valores inválidos')
        }

        this.record = {
            ...record,
            roles: [...record.roles]
        }
    }

    this.save = function(callback) {
        if (!this.record) {
            throw new Error('Não existe registro de suporte para guardar')
        }

        this.record.Id = this.getId()

        // garante estado atualizado
        Users.init()
        const p = Users.data

        // busca índice corretamente
        const i = p.findIndex(e => e.Id === this.record.Id)

        if (i === -1) {
            p.push(this.record) // novo registro
        } else {
            p[i] = this.record // atualiza existente
        }

        Users.update(p) // salva no localStorage

        if (callback instanceof Function) { callback(); }
    }
}

export function SessionUser() {
    this.createSession = function(id){
        const date = new Date()
        date.setTime(date.getTime() + (20*60*1000))

        document.cookie = `token=${id}; expires=${date.toUTCString()}; path=/`
    }

    this.getSession = function() {
        const cookies = document.cookie.replace(/;\s*/g, '&')
        const busca = new URLSearchParams(cookies)
        const token = busca.get('token')

        if(token === null) {
            return 0
        } else {
            return Number(token)
        }
    }

    this.getPermissionSession = function() {
        const Id = this.getSession()

        if(Id === 0) {
            return []
        } else {
            const user = new RecordUser
            user.init(Id)

            return user.record.roles
        }
    }
}