"use client"
import * as React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, ZodTypeAny } from "zod"

import { Checkbox } from "@/components/shared/checkbox/_index"
import { Input } from "@/components/shared/input/_index"
import { Badge } from "@/components/shared/badge/_index"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/shared/form/_index"

import { sources } from "@/static/sources"

const FormSchema = z.object(
  sources.reduce((acc: Record<string, ZodTypeAny>, source) => {
    acc[source.name] = z.boolean().default(false)
    acc[`${source.name}Url`] = z.string().optional()
    return acc
  }, {}),
)

type FormValues = z.infer<typeof FormSchema>

export function SourceCheckboxForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: sources.reduce((acc: FormValues, source) => {
      acc[source.name] = false
      acc[`${source.name}Url`] = ""
      return acc
    }, {} as FormValues),
  })

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sources.map((source) => (
          <FormField
            key={source.name}
            control={form.control}
            name={source.name as keyof z.infer<typeof FormSchema>}
            render={({ field }) => (
              <FormItem
                className={`flex h-full flex-col space-y-2 rounded-md border p-2 shadow ${field.value ? "border-black dark:border-gray-400" : "border-gray-300 dark:border-gray-800"} ${source.disabled ? "opacity-50" : ""}`}
              >
                <div className="flex h-full items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={source.disabled}
                    />
                  </FormControl>
                  <div className="flex h-full flex-col gap-2 leading-none">
                    <FormLabel className={source.disabled ? "text-gray-500" : ""}>
                      {source.label}
                    </FormLabel>
                    <FormDescription className={source.disabled ? "text-gray-500" : ""}>
                      {source.description}
                    </FormDescription>
                    {source.badge && (
                      <Badge variant="outline" className="mt-auto w-fit">
                        {source.badge}
                      </Badge>
                    )}
                    {!source.disabled && source.name === "file" && source.serves && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {source.serves.map((serve) => (
                          <Badge key={serve} variant="outline" className="w-fit text-gray-600">
                            {serve}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {!source.disabled && (
                      <Input
                        type={source.name === "file" ? "file" : "text"}
                        placeholder={`Enter ${source.label}`}
                        {...form.register(`${source.name}Url` as keyof z.infer<typeof FormSchema>)}
                        className="mt-auto"
                        disabled={!field.value}
                      />
                    )}
                  </div>
                </div>
              </FormItem>
            )}
          />
        ))}
      </div>
    </Form>
  )
}
