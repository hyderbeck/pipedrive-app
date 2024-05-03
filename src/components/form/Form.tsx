import Section from "./Section";
import TextInput from "./TextInput";
import Select from "./Select";
import Textarea from "./Textarea";

function Form() {
  return (
    <form>
      <Section heading="Client details">
        <div>
          <TextInput placeholder="First name" />
          <TextInput placeholder="Last name" />
        </div>
        <TextInput placeholder="Phone" />
        <TextInput placeholder="Email (optional)" />
      </Section>
      <Section heading="Job details">
        <div>
          <Select placeholder="Job type" options={["foo", "bar"]} />
          <Select placeholder="Job source" options={["foo", "bar"]} />
        </div>
        <Textarea placeholder="Job description (optional)" />
      </Section>
      <Section heading="Service location">
        <TextInput placeholder="Address" />
        <TextInput placeholder="City" />
        <TextInput placeholder="State" />
        <div>
          <TextInput placeholder="Zip code" />
          <Select placeholder="Area" options={["foo", "bar"]} />
        </div>
      </Section>
      <Section heading="Scheduled">
        <TextInput placeholder="Start date" />
        <TextInput placeholder="Start time" />
        <TextInput placeholder="End time" />
        <Select placeholder="Test select" options={["foo", "bar"]} />
      </Section>
      <button>Create job</button>
    </form>
  );
}

export default Form;
