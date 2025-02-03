import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import IconButton from '../buttons/IconButton'
import Modal from '../modals/Modal'
import DefaultButton from '../buttons/DefaultButton'
import useModal from '../../hooks/useModal'

function DropDownHeader({ back, feature, routes, title }) {
  const router = useNavigate()
  const { isOpen, open, close, value } = useModal(title)
  return (
    <header
      className={`
        w-full h-[56px] px-4 py-2
        flex flex-row items-center justify-between
        border-b border-gray-200`}
    >
      <div className='min-w-12'>
        {back && (
          <IconButton
            icon={{
              name: 'keyboard_arrow_left',
              size: 28,
            }}
            onClick={() => {
              router(-1)
            }}
          />
        )}
      </div>

      <div className='relative flex items-center min-w-12 gap-1' onClick={open}>
        <p className='font-bold text-lg'>{title}</p>
        <IconButton
          icon={{
            name: 'autorenew',
            size: 20,
            className: 'text-blue-400 rounded-full',
            wght: 600,
          }}
        />
      </div>
      <div className='min-w-12 flex items-center justify-end'>
        {feature && (
          <IconButton icon={feature.icon} onClick={feature.onClick} />
        )}
      </div>
      {isOpen && (
        <Modal close={close}>
          {routes.map(({ name, to }) => (
            <DefaultButton
              key={name}
              type={name == title ? '' : 'gray'}
              onClick={() => {
                close()
                router(to)
              }}
            >
              {name}
            </DefaultButton>
          ))}
        </Modal>
      )}
    </header>
  )
}

DropDownHeader.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string.isRequired,
  routes: PropTypes.array,
  feature: PropTypes.object,
}
export default DropDownHeader
