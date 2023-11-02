import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo,
  handelCloseModal: () => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  handelCloseModal,
}) => {
  const [user, setUser] = useState<User>();
  const [isLoadingModal, setIsLoadingModal] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsLoadingModal(false));
  }, []);

  const status = selectedTodo.completed ? 'Done' : 'Planned';

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handelCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-danger': selectedTodo.completed === false,
                'has-text-success': selectedTodo.completed === true,
              })}
              >
                {status}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
