// Hook that uses Ionic Filesystem and Directory to store and retrieve data

import { useState, useEffect } from 'react'
import { Filesystem, Directory } from '@capacitor/filesystem'

const useStorage = <T>(path: string): [T | null, (value: T) => Promise<void>, boolean] => {
  const [value, setValue] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadSaved = async () => {
      try {
        setLoading(true)
        const content = await Filesystem.readFile({
          path,
          directory: Directory.Data,
        })
        if (content) {
          setValue(JSON.parse(content.data))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadSaved()
  }, [path])

  const save = async (value: T) => {
    setLoading(true)
    await Filesystem.writeFile({
      path,
      data: JSON.stringify(value),
      directory: Directory.Data,
    })
    setValue(value)
    setLoading(false)
  }

  return [value, save, loading]
}

export default useStorage
