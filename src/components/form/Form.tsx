import Section from "./Section";
import TextInput from "./TextInput";
import Select from "./Select";
import Textarea from "./Textarea";
import Button from "../Button";

function Form() {
  return (
    <form action={"/api/jobs/new"}>
      <Section heading="Client details">
        <div>
          <TextInput placeholder="First name" name="firstName" type="text" />
          <TextInput placeholder="Last name" name="lastName" type="text" />
        </div>
        <TextInput placeholder="Phone" name="phone" type="tel" />
        <TextInput placeholder="Email (optional)" name="email" type="email" />
      </Section>
      <Section heading="Job details">
        <div>
          <Select
            placeholder="Job type"
            options={["foo", "bar"]}
            name="jobType"
          />
          <Select
            placeholder="Job source"
            options={["foo", "bar"]}
            name="jobSource"
          />
        </div>
        <Textarea
          placeholder="Job description (optional)"
          name="jobDescription"
        />
      </Section>
      <Section heading="Service location">
        <TextInput placeholder="Address" name="address" type="text" />
        <TextInput placeholder="City" name="city" type="text" />
        <TextInput placeholder="State" name="state" type="text" />
        <div>
          <TextInput placeholder="Zip code" name="zipCode" type="text" />
          <Select placeholder="Area" options={["foo", "bar"]} name="Area" />
        </div>
      </Section>
      <Section heading="Scheduled">
        <TextInput placeholder="Start date" name="startDate" type="date" />
        <TextInput placeholder="Start time" name="startTime" type="time" />
        <TextInput placeholder="End time" name="endTime" type="time" />
        <Select
          placeholder="Test select"
          options={["foo", "bar"]}
          name="testSelect"
        />
      </Section>
      <Button text="Create job" />
    </form>
  );
}

export default Form;
