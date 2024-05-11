import Test from '../components/Test';
import { State } from '../store/slices/testSlice';
import { chooseMany } from './fixtures/questionsData';
import renderWithRedux from './helpers/renderWithRedux';

describe('тест компонента Test.tsx', () => {
  const initialState = {
    test: {
      timer: true,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseMany],
      currentQuestion: chooseMany,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };

  test('отрисовка с таймером', () => {
    const { getByText, getByTestId } = renderWithRedux(<Test />, initialState);
    const header = getByText(/тестирование/i);
    const timer = getByTestId('timer');
    const stepper = getByTestId('stepper');
    const question = getByText(chooseMany.question);

    const elements = [header, timer, stepper, question];
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('отрисовка без таймера', () => {
    const initialState = {
      test: {
        timer: false,
        time: [5, 0],
        phase: 'inProcess',
        questions: [chooseMany],
        currentQuestion: chooseMany,
        currentStep: 0,
        completedSteps: {},
        result: [],
      } as State,
    };

    const { queryByTestId } = renderWithRedux(<Test />, initialState);
    const timer = queryByTestId('timer');
    expect(timer).not.toBeInTheDocument();
  });
});