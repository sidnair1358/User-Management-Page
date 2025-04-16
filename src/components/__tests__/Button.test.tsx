import { render } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("Renders correctly for default button", () => {
    const { asFragment } = render(
      <Button label="default" type="button" onClick={() => {}}>
        Button Text
      </Button>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
