import Button from '../components/button'
import Input from '../components/input'
import Paper from '../components/paper'
import TextArea from '../components/text-area'

export default function CreateCrowdfundPage() {
  return (
    <Paper className='p-5'>
      <form>
        <h1 className='text-center text-2xl mb-4 font-bold'>Create Crowdfund</h1>
        <div className="flex flex-col gap-5">
          <Input title='Title' placeholder='Buy korma'/>
          <TextArea title='Description' placeholder='Tell me something about this ...'/>
          <Input props={{type: 'number'}} title='ICP Amount' placeholder='10 ICP'/>
          <Input  props={{type: 'date'}}  title='End Date' />
          <Button>Submit</Button>
        </div>
      </form>
    </Paper>
  )
}
