import { Fragment } from "react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Option {
	label: string;
	value: string;
}

interface SelectProps {
	options: Option[];
	selected: Option;
	onChange: (value: Option) => void;
	label?: string;
}

const Select = ({ options, selected, onChange, label }: SelectProps) => {
	return (
		<div className='w-44'>
			{label && (
				<label className='mb-1 block text-sm font-medium text-gray-700'>
					{label}
				</label>
			)}
			<Listbox value={selected} onChange={onChange}>
				<div className='relative mt-1'>
					<ListboxButton className='relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm shadow-sm focus:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-800/50'>
						<span className='block truncate'>{selected.label}</span>
						<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
							<ChevronUpDownIcon
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</span>
					</ListboxButton>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
							{options.map((option) => (
								<ListboxOption
									key={option.value}
									className={({ active }) =>
										clsx(
											"relative cursor-pointer select-none py-2 pl-10 pr-4",
											active ? "bg-sky-100 text-sky-900" : "text-gray-900",
										)
									}
									value={option}>
									{({ selected }) => (
										<>
											<span
												className={clsx(
													"block truncate",
													selected && "font-medium",
												)}>
												{option.label}
											</span>
											{selected ? (
												<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600'>
													<CheckIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											) : null}
										</>
									)}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default Select;
