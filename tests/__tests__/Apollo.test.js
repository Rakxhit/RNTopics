import Apollo from "@/app/(tabs)/(home)/Apollo";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { useQuery } from "@apollo/client";

jest.mock("@apollo/client", () => {
  const originalModule = jest.requireActual("@apollo/client");
  return {
    __esModule: true,
    ...originalModule,
    useSuspenseQuery: jest.fn().mockReturnValue({
      data: {
        company: {
          ceo: "raxit",
        },
      },
    }),
    useQuery: jest.fn().mockReturnValue({
      loading: false,
      error: "",
      data: {
        company: {
          ceo: "raxit",
        },
      },
      startPolling: () => jest.fn(),
      stopPolling: () => jest.fn(),
    }),
  };
});

describe("Apollo component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    const { toJSON } = render(<Apollo />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("should have the Desired text", () => {
    const title = "Default polling is 5000";
    const { getByText } = render(<Apollo />);
    expect(getByText(title)).toBeTruthy();
  });

  it("it should return the error message", () => {
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: new Error("Some Error Occured"),
      data: null,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    });

    const { getByText } = render(<Apollo />);
    expect(getByText("What an error")).toBeTruthy();
  });

  it("calling start polling with 1000", () => {
    const startPolling = jest.fn();
    const stopPolling = jest.fn();
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: "",
      data: {
        company: {
          ceo: "raxit",
        },
      },
      startPolling: startPolling,
      stopPolling: stopPolling,
    });

    const { getByTestId } = render(<Apollo />);

    const startPollingButton = getByTestId("start-polling");
    expect(startPollingButton).toBeTruthy();
    fireEvent.press(startPollingButton);
    expect(startPolling).toHaveBeenCalled();

    const stopPollingButton = getByTestId("stop-polling");
    expect(stopPollingButton).toBeTruthy();
    fireEvent.press(stopPollingButton);
    expect(stopPolling).toHaveBeenCalled();
  });
});
