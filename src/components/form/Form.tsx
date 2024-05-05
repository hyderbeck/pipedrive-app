import Section from "./Section";
import TextInput from "./TextInput";
import Select from "./Select";
import Textarea from "./Textarea";
import Button from "../Button";

function Form() {
  return (
    <form action="api/jobs/new" method="POST">
      <Section heading="Client details">
        <div>
          <TextInput placeholder="First name" name="first_name" type="text" />
          <TextInput placeholder="Last name" name="last_name" type="text" />
        </div>
        <TextInput placeholder="Phone" name="phone" type="tel" />
        <TextInput placeholder="Email (optional)" name="email" type="email" />
      </Section>
      <Section heading="Job details">
        <div>
          <Select
            placeholder="Job type"
            options={["foo", "bar"]}
            name="Job type"
          />
          <Select
            placeholder="Job source"
            options={["foo", "bar"]}
            name="Job source"
          />
        </div>
        <Textarea
          placeholder="Job description (optional)"
          name="Job description"
        />
      </Section>
      <Section heading="Service location">
        <TextInput placeholder="Address" name="Address" type="text" />
        <TextInput placeholder="City" name="city" type="text" />
        <TextInput placeholder="State" name="state" type="text" />
        <div>
          <TextInput placeholder="Zip code" name="zip_code" type="text" />
          <Select placeholder="Area" options={["foo", "bar"]} name="Area" />
        </div>
      </Section>
      <Section heading="Scheduled">
        <TextInput placeholder="Start date" name="Job date" type="date" />
        <TextInput placeholder="Start time" name="Job start time" type="time" />
        <TextInput placeholder="End time" name="Job end time" type="time" />
        <Select
          placeholder="Test select"
          options={["foo", "bar"]}
          name="Test select"
        />
      </Section>
      <Button text="Create job" submit />
    </form>
  );
}

export default Form;
