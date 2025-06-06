import app from '@/myApp'
import { Field, ErrorMessage, Form } from "vee-validate";
import InputText from "@/components/Shared/Input/Text/index.vue"
import InputSelect from "@/components/Shared/Input/Select/index.vue"
import InputEditor from "@/components/Shared/Input/Editor/index.vue"
import InputPassword from "@/components/Shared/Input/Password/index.vue"
import InputTextarea from "@/components/Shared/Input/Textarea/index.vue"
import InputAutoComplete from "@/components/Shared/Input/AutoComplete/index.vue"
import InputRadio from "@/components/Shared/Input/Radio/index.vue"
import Button from "@/components/Shared/Button/index.vue"
import Destroy from "@/components/Shared/Destroy/index.vue"
import GenericDialog from "@/components/Shared/GenericDialog/index.vue"
import Pagination from "@/components/Shared/Pagination/index.vue"
import Image from "@/components/Shared/Image/index.vue"
import Table from "@/components/Shared/Table/index.vue"
import LocaleSelector from "@/components/Shared/LocaleSelector/index.vue"
import InputToggle from "@/components/Shared/Input/Toggle/index.vue"
import InputDate from "@/components/Shared/Input/Date/index.vue"
import InputTime from "@/components/Shared/Input/Time/index.vue"
import InputFile from "@/components/Shared/Input/File/index.vue"
import LoaderProgress from "@/components/Shared/LoaderProgress/index.vue"
import Loading from "@/components/Shared/Loading/index.vue"


app.component("Loading", Loading)
app.component("LoaderProgress", LoaderProgress)
app.component("Table", Table)
app.component("Image", Image)
app.component("Field", Field)
app.component("Form", Form)
app.component("InputText", InputText)
app.component("InputSelect", InputSelect)
app.component("InputPassword", InputPassword)
app.component("InputTextarea", InputTextarea)
app.component("InputAutoComplete", InputAutoComplete)
app.component("InputRadio", InputRadio)
app.component("InputEditor", InputEditor)
app.component("InputDate", InputDate)
app.component("InputTime", InputTime)
app.component("InputToggle", InputToggle)
app.component("InputFile", InputFile)
app.component("ErrorMessage", ErrorMessage)
app.component("Button", Button)
app.component("Destroy", Destroy)
app.component("GenericDialog", GenericDialog)
app.component("Pagination", Pagination)
app.component("LocaleSelector", LocaleSelector)
