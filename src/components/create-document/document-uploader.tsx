import { useState } from 'react'
import React from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Upload, FileCheck } from "lucide-react"

export default function Component() {
  const [file, setFile] = useState<File | null>(null)
  const [hash, setHash] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const uploadDocument = () => {
    if (file) {
      // Simulate blockchain hash generation
      const simulatedHash = Math.random().toString(36).substring(2, 15)
      setHash(simulatedHash)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Document Upload and Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={uploadDocument} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          {hash && (
            <div className="mt-4">
              <p className="text-sm font-medium">Document Hash:</p>
              <p className="text-xs">{hash}</p>
              <div className="mt-2 flex items-center text-green-600">
                <FileCheck className="mr-2 h-4 w-4" />
                <span className="text-sm">Document verified on blockchain</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}