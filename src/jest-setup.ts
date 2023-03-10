import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { server } from './mocks/server';
import ResizeObserver from 'resize-observer-polyfill';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

Enzyme.configure({
  adapter: new Adapter()
});

const globalAny: any = global;
globalAny.ResizeObserver = ResizeObserver;
