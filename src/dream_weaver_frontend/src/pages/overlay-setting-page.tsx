import React from 'react'
import Button from '../components/button'
import Content from '../components/content'
import Input from '../components/input'
import Overlay from '../components/overlay'
import Paper from '../components/paper'
import TextArea from '../components/text-area'
import useAuth from '../contexts/auth-context'
import { TDonation } from '../types/donation-type'

const DEFAULT_OVERLAY : TDonation = {
  amount: 50,
  from: 'TinTin Winata',
  message: 'Goodluck on your Journey!'
}

export default function OverlaySettingPage() {
  const {user} = useAuth();
  if (user) {
    return (
      <div className='flex flex-col gap-2'>
        <Overlay currentDonation={DEFAULT_OVERLAY} />
        <Paper className="p-5 mx-5 flex flex-col gap-4">
          <TextArea title='Filter Text'></TextArea>
          <Input title='Notification Duration' placeholder='500' props={{type: 'number'}} />
          <Button>Save</Button>
        </Paper>
        <Paper className="mt-2 p-5 mx-5 flex flex-col gap-4">
          <Content
            title='Donate Link'
            value={`${import.meta.env.VITE_APP_URL}/donate/${user.username}`}
            props={{ disabled: true }}
            />
          <Content
            title='Overlay Link'
            value={`${import.meta.env.VITE_APP_URL}/overlay/${user.username}`}
            props={{ disabled: true }}
            />
        </Paper>
      </div>
    );
  } else return <></>;
}
