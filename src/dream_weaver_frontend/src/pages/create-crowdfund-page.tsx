import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Paper from '../components/paper';
import TextArea from '../components/text-area';
import Upload from '../components/upload';

export default function CreateCrowdfundPage() {
  const [selectedFile, setSelectedFile] = useState<File>();
  return (
    <Paper className='p-5'>
      <form>
        <h1 className='text-center text-2xl mb-4 font-bold'>Create Crowdfund</h1>
        <div className="flex flex-col gap-5">
          <Input title='Title' placeholder='Buy korma'/>
          <TextArea props={{style: {minHeight: '200px'}}} title='Description' placeholder='Tell me something about this ...'/>
          <Input props={{type: 'number'}} title='ICP Amount' placeholder='10 ICP'/>
          <Input  props={{type: 'date'}}  title='End Date' />
        <Upload
            accept={['jpg', 'png', 'jpeg']}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            title="Drag file Image here or browse"
          />
          <Button>Submit</Button>
        </div>
      </form>
    </Paper>
  )
}
