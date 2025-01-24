"use client"
import * as React from "react"
import { useFormContext } from "react-hook-form"

import { Checkbox } from "@/components/shared/checkbox/_index"
import { Input } from "@/components/shared/input/_index"
import { Badge } from "@/components/shared/badge/_index"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/shared/form/_index"

import { sources } from "@/static/sources"

export function SourceCheckboxForm() {
  const { control, setValue } = useFormContext()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sources.map((source) => (
        <FormField
          key={source.name}
          control={control}
          name={source.name}
          render={({ field }) => (
            <FormItem
              className={`flex h-full flex-col space-y-2 border p-2 shadow ${field.value ? "border-black dark:border-gray-400" : "border-gray-300 dark:border-gray-800"} ${source.disabled ? "opacity-50" : ""}`}
            >
              <div className="flex h-full items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      if (checked) {
                        setValue("source", source.name)
                      } else {
                        setValue("source", "")
                      }
                    }}
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
                    <FormField
                      control={control}
                      name={source.name === "file" ? "file" : `${source.name}Url`}
                      render={({ field: inputField }) => (
                        <Input
                          type={source.name === "file" ? "file" : "text"}
                          placeholder={`Enter ${source.label}`}
                          onChange={(e) => {
                            if (source.name === "file") {
                              const file = e.target.files?.[0]
                              setValue("file", file)
                            } else {
                              inputField.onChange(e.target.value)
                            }
                          }}
                          className="mt-auto"
                          disabled={!field.value}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
