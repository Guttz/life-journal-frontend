import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { InputGroup, Input, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import HTTPClient from './../../../utils/httpClient';
import { getToken, setToken } from '../../../utils/localStorage';
import './LoginModal.scss';

type Props = {
  buttonLabel: string;
};

const LoginModal: React.FC<Props> = ({ buttonLabel }) => {
  const http = new HTTPClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modal, setModal] = useState(true);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [visibleSpinner, setVisibleSpinner] = useState(false);

  const onToggleAlert = (): void => setVisibleAlert(!visibleAlert);
  const onToggleModel = (): void => setModal(!modal);

  const onLoginAttempt = (): void => {
    setVisibleAlert(false);
    setVisibleSpinner(true);
    const loginRequest = http.post<any>('/auth/login', {
      username: email,
      password: password,
    });

    loginRequest.then(
      response => {
        setToken(response.data.token);
        setVisibleSpinner(false);
        onToggleModel();
      },
      error => {
        setVisibleSpinner(false);
        setVisibleAlert(true);
        console.log(error);
      },
    );
  };

  return (
    <div>
      <Button onClick={onToggleModel}>{buttonLabel}</Button>

      <Modal className="modal-dialog-centered" isOpen={modal} toggle={onToggleModel}>
        <ModalHeader className="d-flex justify-content-center" toggle={onToggleModel}>
          Login
        </ModalHeader>
        <ModalBody className="pt-5 pb-4 px-5">
          <InputGroup className="mb-4">
            <FontAwesomeIcon className="fontIconClass" icon={faUser} />
            <Input
              className="inputClass"
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              onChange={(e): void => {
                setEmail(e.target.value);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-5">
            <FontAwesomeIcon className="fontIconClass" icon={faUnlockAlt} />
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              onChange={(e): void => {
                setPassword(e.target.value);
              }}
            />
          </InputGroup>

          <Button className="loginButton" color="primary" onClick={onLoginAttempt}>
            Sign in
          </Button>
          <Alert id="snackbar" color="danger" isOpen={visibleAlert} toggle={onToggleAlert} fade={true}>
            Wrong credentials. Please check your Email and Password.
          </Alert>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <span>
            Not yet registered? <a href="/signup">Sign up</a>
          </span>
        </ModalFooter>
        <Spinner
          className="spinner"
          style={{ width: '9rem', height: '9rem', borderWidth: '.4em' }}
          hidden={!visibleSpinner}
          color="info"
        />
      </Modal>
    </div>
  );
};

export default LoginModal;
