import { useEffect, useRef, useState } from 'react';
import { getData, postData } from '../../../../library/AxiosLib';
import { useStateGlobal } from '../../../../utils/GlobalState';
import { ServerURL } from '../../../../config/default.json';
import { GET_DATA, POST_MEMBER } from '../../../../utils/types';
import CloseIcon from '../../../../assets/icon/CloseIcon';

export default function CreateMemberModal({ handleGetRefCreateMember }) {
  const [formInputMember, setFormInputMember] = useState({});
  const modalCreate = useRef(null);
  const formInput = useRef(null);
  const [state, dispatch] = useStateGlobal();

  useEffect(() => {
    handleGetRefCreateMember(modalCreate);
  }, [handleGetRefCreateMember]);

  function closeModalCrete() {
    modalCreate.current.style.visibility = 'hidden';
  }

  function handleChngeCreateMember(e) {
    setFormInputMember({ ...formInputMember, [e.target.name]: e.target.value });
  }

  function handleSubmitMemberCreate(e) {
    if (state.loading !== true) {
      const { name, email, phone } = formInputMember;
      const newStateFprmCreateMember = {
        name,
        email,
        phone,
      };
      dispatch({ type: POST_MEMBER, loading: true });
      postData(
        `${ServerURL}/member`,
        newStateFprmCreateMember,
        localStorage.getItem('token')
      )
        .then(() => {
          getData(`${ServerURL}/member`, localStorage.getItem('token')).then(
            (response) => {
              dispatch({
                type: GET_DATA,
                book: state.book,
                member: response.data.member,
                loading: false,
              });
              formInput.current.childNodes.forEach((e) => {
                e.value = null;
              });
            }
          );
          modalCreate.current.style.visibility = 'hidden';
        })
        .catch((err) => {
          console.log(err);
        });
    }
    e.preventDefault();
  }

  return (
    <div className='containerModalCreate modal' ref={modalCreate}>
      <div>
        <form onSubmit={handleSubmitMemberCreate} ref={formInput}>
          <div>
            <span>Tambah Member</span>
            <div onClick={closeModalCrete}>
              <CloseIcon height='20px' width='20px' color='black' />
            </div>
          </div>
          <input
            autoComplete='off'
            required
            onChange={handleChngeCreateMember}
            type='text'
            name='name'
            placeholder='Nama'
          />
          <input
            autoComplete='off'
            required
            onChange={handleChngeCreateMember}
            type='text'
            name='email'
            placeholder='Email'
          />
          <input
            autoComplete='off'
            required
            onChange={handleChngeCreateMember}
            type='text'
            name='phone'
            placeholder='Telepon'
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
