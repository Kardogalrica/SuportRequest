import {useRef, useState} from 'react'

import IF from '../../Widgets/IF/IF'

const UploadMultifile = ({
                            initData = []
                            ,accept = ".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
                            ,MaxFiles = 5
                            ,isEdit = true
                            ,eventoReturn}
                        ) => {
    const inputRef = useRef(null)
    const [pending, setPending] = useState([])

    const files = initData


    const readFile = (file) => (
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () =>
                resolve({ name: file.name, type: file.type, content: reader.result })
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    )

    async function addFile(e) {
        const nextPending = await Promise.all(Array.from(e.target.files).map(readFile))
        setPending(nextPending)
    }

    function save() {
        let totalFiles = [...files, ...pending]
        setPending([])
        inputRef.current.value = ''
        if(files.length > MaxFiles) {
            return
        }
        eventoReturn(totalFiles)
    }

    function removeFile(i) {
        let newFiles = files.filter((_, index) => index !== i)
        eventoReturn(newFiles)
    }

    async function downloadFile(file) {
        const blob = await (await fetch(file.content)).blob()
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        a.click()

        URL.revokeObjectURL(url)
    }

  return (
    <>
    <div
    className='d-flex flex-column gap-3'
    > 
        <IF
            Condition={isEdit}
            True={
                        <div
                        className='d-flex gap-3'
                        >
                            <input
                            ref={inputRef} 
                            type="file"
                            className="form-control"
                            multiple
                            accept={accept}
                            onChange={(e) => addFile(e)}
                            />
                            <button
                                className='btn btn-primary'
                                type="button"
                                onClick={save}
                            >
                            Gravar</button>         
                        </div>
            }
        />
        <IF
        Condition={files.length !== 0}
        True={
                <table className="table">
                    <thead>
                        <tr>
                        <th className="w-100" >Ficheiro</th>
                        <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((el,i) => (
                            <tr key={i}>
                                <td>{el.name}</td>
                                <td
                                className="text-nowrap d-flex gap-3"
                                >
                                    <IF
                                    Condition={isEdit}
                                    True={
                                        <button
                                        className='btn btn-primary'
                                        type="button"
                                        onClick={()=>{removeFile(i)}}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    }
                                    />
                                    <button
                                    className='btn btn-primary'
                                    type="button"
                                    onClick={() => downloadFile(el)}
                                    >
                                        <i className="bi bi-download"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        }
        />
    </div>
    </>
  )
}

export default UploadMultifile
