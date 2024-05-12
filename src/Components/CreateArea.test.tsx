import { render, fireEvent } from '@testing-library/react';
import CreateArea from './CreateArea';

test('renders CreateArea component', () => {
  render(
    <CreateArea
      title=""
      setTitle={() => {}}
      content=""
      setContent={() => {}}
      handleSubmit={() => {}}
    />
  );
});

test('fills title and content inputs and submits the form', () => {
  const setTitleMock = jest.fn();
  const setContentMock = jest.fn();
  const handleSubmitMock = jest.fn();

  const { getByLabelText, getByTestId } = render(
    <CreateArea
      title=""
      setTitle={setTitleMock}
      content=""
      setContent={setContentMock}
      handleSubmit={handleSubmitMock}
    />
  );
  const titleInput = getByLabelText('Title:') as HTMLInputElement;
  const contentInput = getByLabelText('Content:') as HTMLInputElement;
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(contentInput, { target: { value: 'Test Content' } });

  fireEvent.submit(getByTestId('create-area-form'));

  expect(setTitleMock).toHaveBeenCalledWith('Test Title');
  expect(setContentMock).toHaveBeenCalledWith('Test Content');
  expect(handleSubmitMock).toHaveBeenCalled();
});
