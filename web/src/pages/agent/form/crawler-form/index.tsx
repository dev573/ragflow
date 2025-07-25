import { SelectWithSearch } from '@/components/originui/select-with-search';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslate } from '@/hooks/common-hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { initialCrawlerValues } from '../../constant';
import { useWatchFormChange } from '../../hooks/use-watch-form-change';
import { INextOperatorForm } from '../../interface';
import { CrawlerResultOptions } from '../../options';
import { QueryVariable } from '../components/query-variable';

const FormSchema = z.object({
  query: z.string().optional(),
  proxy: z.string().url(),
  extract_type: z.string(),
});
function CrawlerForm({ node }: INextOperatorForm) {
  const { t } = useTranslate('flow');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialCrawlerValues,
    mode: 'onChange',
  });

  useWatchFormChange(node?.id, form);

  const crawlerResultOptions = useMemo(() => {
    return CrawlerResultOptions.map((x) => ({
      value: x,
      label: t(`crawlerResultOptions.${x}`),
    }));
  }, [t]);

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <QueryVariable></QueryVariable>
        <FormField
          control={form.control}
          name="proxy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('proxy')}</FormLabel>
              <FormControl>
                <Input placeholder="like: http://127.0.0.1:8888" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="extract_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('extractType')}</FormLabel>
              <FormControl>
                <SelectWithSearch {...field} options={crawlerResultOptions} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CrawlerForm;
