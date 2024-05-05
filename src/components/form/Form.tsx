import Section from "./Section";
import TextInput from "./TextInput";
import Select from "./Select";
import Textarea from "./Textarea";
import Button from "../Button";
import { useState } from "react";

function Form() {
  const [link, setLink] = useState("");
  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const id = await res.text();
      setLink(`https://tbd16.pipedrive.com/deal/${id}`);
    }
  }
  if (link)
    return (
      <a
        href={link}
        className="border-2 rounded-md text-lg px-4 py-1 border-blue-400 hover:shadow-inner hover:shadow-neutral-300"
      >
        View job
      </a>
    );
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={createJob} className="flex flex-col gap-y-6 items-center">
      <div className="flex justify-between gap-6 flex-col sm:flex-row">
        <Section heading="Client details">
          <div className="flex gap-x-2">
            <TextInput
              placeholder="First name"
              name="first_name"
              type="text"
              required
            />
            <TextInput
              placeholder="Last name"
              name="last_name"
              type="text"
              required
            />
          </div>
          <TextInput placeholder="Phone" name="phone" type="tel" required />
          <TextInput placeholder="Email (optional)" name="email" type="email" />
        </Section>
        <Section heading="Job details">
          <Select
            placeholder="Job type"
            options={["foo", "bar"]}
            name="Job type"
            required
          />
          <Select
            placeholder="Job source"
            options={["foo", "bar"]}
            name="Job source"
            required
          />
          <Textarea
            placeholder="Job description (optional)"
            name="Job description"
          />
        </Section>
      </div>
      <div className="flex justify-between gap-6 flex-col sm:flex-row">
        <Section heading="Service location">
          <TextInput
            placeholder="Address"
            name="Address"
            type="text"
            required
          />
          <TextInput placeholder="City" name="city" type="text" required />
          <TextInput placeholder="State" name="state" type="text" required />
          <div className="flex gap-x-2">
            <TextInput
              placeholder="Zip code"
              name="zip_code"
              type="text"
              required
            />
            <Select
              placeholder="Area"
              options={["foo", "bar"]}
              name="Area"
              required
            />
          </div>
        </Section>
        <Section heading="Scheduled">
          <TextInput
            placeholder="Start date"
            name="Job date"
            type="date"
            required
          />
          <div className="flex justify-center gap-x-2">
            <TextInput
              placeholder="Start time"
              name="Job start time"
              type="time"
              required
            />
            <TextInput
              placeholder="End time"
              name="Job end time"
              type="time"
              required
            />
          </div>
          <Select
            placeholder="Test select"
            options={["foo", "bar"]}
            name="Test select"
            required
          />
        </Section>
      </div>
      <Button text="Create job" submit />
    </form>
  );
}

export default Form;
