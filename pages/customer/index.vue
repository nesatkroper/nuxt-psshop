<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useApiStore } from "~/stores/api";
import { Toaster } from "@/components/ui/toast";

const { toast } = useToast();
const customer = ref([]);
const edit = ref([]);
const datetime = ref(new Date().toLocaleString());
const selectFile = ref("");
const imgUrl = ref("");
const name = ref("");
const gender = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");

const apiStore = useApiStore();
const apiUrl = apiStore.api.apiUrl;
const domain = apiStore.api.domain;

const clearInput = () => {
  name.value = "";
  gender.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  imgUrl.value = "";
  selectFile.value = "";
};

const fetchData = async () => {
  const response = await fetch(`${apiUrl}/customer`);
  customer.value = (await response?.json()) ?? [];
  console.log(customer.value);
};

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  selectFile.value = file;

  if (file) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      imgUrl.value = event.target.result;
      const photo: any = document.getElementById("photo");
      photo.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
};

const handleCreate = async () => {
  if (!selectFile.value) {
    alert("Please select a photo to create");
    return;
  } else {
    try {
      await axios({
        method: "post",
        url: `${API_URL}/customer`,
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          name: name.value,
          gender: gender.value,
          email: email.value,
          phone: phone.value,
          address: address.value,
          photo: selectFile.value,
        },
      })
        .then((respone) => {
          console.log(respone);
        })
        .catch((err) => {
          console.log(err);
        });

      fetchData();
      clearInput();
    } catch (err) {
      console.log(err);
    }
  }
};

const handleEdit = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/customer/${id}`);
    edit.value = (await response?.json()) ?? [];
    const data: any = Object.values(edit.value);
    selectFile.value = data[1];
    name.value = data[2];
    gender.value = data[3];
    email.value = data[4];
    phone.value = data[5];
    address.value = data[6];
  } catch (err) {
    console.log(err);
  }
};

const handleUpdate = async (id: number) => {
  if (!selectFile.value) {
    alert("Please select a photo to create");
    return;
  } else {
    try {
      await axios({
        method: "post",
        url: `${API_URL}/customer/${id}`,
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-HTTP-Method-Override": "PUT",
        },
        data: {
          name: name.value,
          gender: gender.value,
          email: email.value,
          phone: phone.value,
          address: address.value,
          photo: selectFile.value,
        },
      })
        .then((respone) => {
          console.log(respone);
        })
        .catch((err) => {
          console.log(err);
        });
      fetchData();
      clearInput();
    } catch (err) {
      console.log(err);
    }
  }
};

const handleDelete = async (id: number) => {
  try {
    await axios({
      method: "delete",
      url: `${API_URL}/customer/${id}`,
    })
      .then((respone) => {
        console.log(respone);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData();
  } catch (err) {
    console.log(err);
  }
};

// function skeleton() {
//   var is = true;
//   let skeleton = document.querySelectorAll(".skeleton");
//   if (is) {
//     skeleton.forEach((ske) => {
//       ske.classList.remove("hidden");
//       ske.classList.add("flex");
//     });
//     is = false;
//   } else if (is == false) {
//     skeleton.forEach((ske) => {
//       ske.classList.remove("flex");
//       ske.classList.add("hidden");
//     });
//     is = true;
//   }
//   console.log(is);
// }

onMounted(() => {
  fetchData();
});
</script>

<template>
  <!-- <Button @click="skeleton">test</Button> -->
  <Toaster />
  <div class="container my-8">
    <Card class="drop-shadow shadow-xl">
      <CardHeader>
        <CardTitle>Customer</CardTitle>
        <Dialog>
          <DialogTrigger class="flex float-start">
            <Button class="w-[200px]">Add Customer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogDescription> </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="handleCreate">
              <div class="flex flex-row gap-4">
                <FormItem class="mt-2 w-full">
                  <label for="name">Name:</label>
                  <Input v-model="name" type="text" />
                </FormItem>
                <FormItem class="mt-2 w-full">
                  <label for="gender">Gender:</label>
                  <Select v-model="gender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male"> Male </SelectItem>
                        <SelectItem value="female"> Female </SelectItem>
                        <SelectItem value="other"> Others </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              <div class="flex flex-row gap-4">
                <FormItem class="mt-2 w-full">
                  <label for="email">Email:</label>
                  <Input v-model="email" type="email" />
                </FormItem>
                <FormItem class="mt-2 w-full">
                  <label for="phone">Phone:</label>
                  <Input v-model="phone" type="text" />
                </FormItem>
              </div>
              <FormItem class="mt-2">
                <label for="address">Address:</label>
                <Textarea v-model="address" type="text" />
              </FormItem>
              <div class="flex flex-row gap-4">
                <FormItem class="mt-2 w-full">
                  <label for="photo">Photo:</label>
                  <Input type="file" @change="handleFileChange" />
                </FormItem>
                <FormItem class="mt-2 w-full">
                  <img
                    v-if="imgUrl"
                    :src="imgUrl"
                    alt="Image Preview"
                    class="h-[100px] rounded-lg"
                  />
                  <img
                    v-else
                    src="../../assets/images/default-image.png"
                    alt="Callback Image"
                    class="h-[100px] rounded-lg"
                  />
                </FormItem>
              </div>
              <FormItem class="mt-2 flex gap-2">
                <DialogClose>
                  <Button
                    type="submit"
                    @click="
                      () => {
                        toast({
                          title: 'Customer Added Successfully',
                          description: `on this day, ${datetime}`,
                        });
                      }
                    "
                  >
                    Submit
                  </Button>
                </DialogClose>
              </FormItem>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea class="rounded-md border p-4">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead class="hidden sm:table-cell">Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead class="hidden lg:table-cell">Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead class="hidden md:table-cell">Address</TableHead>
                <TableHead class="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <!--  -->
              <div class="skeleton hidden items-center space-x-4">
                <Skeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-[250px]" />
                  <Skeleton class="h-4 w-[200px]" />
                </div>
              </div>
              <!--  -->
              <TableRow v-for="(row, index) in customer" :key="row.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell class="hidden sm:table-cell">
                  <img
                    class="rounded-md h-[50px]"
                    :src="`${DOMAIN}/customer/${row.photo}`"
                    alt="Customer Image"
                  />
                </TableCell>
                <TableCell> {{ row.name }}</TableCell>
                <TableCell class="hidden lg:table-cell">{{
                  row.gender
                }}</TableCell>
                <TableCell>{{ row.email }}</TableCell>
                <TableCell>{{ row.phone }}</TableCell>
                <TableCell class="hidden md:table-cell">{{
                  row.address
                }}</TableCell>
                <TableCell class="gap-2 hidden md:flex">
                  <TooltipProvider>
                    <Dialog>
                      <DialogTrigger class="flex float-start">
                        <Tooltip>
                          <TooltipTrigger
                            ><Button @click="handleEdit(row.id)"
                              >Edit</Button
                            ></TooltipTrigger
                          >
                          <TooltipContent>
                            <p>Edit Customer Information</p>
                          </TooltipContent>
                        </Tooltip>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Information</DialogTitle>
                          <DialogDescription> </DialogDescription>
                        </DialogHeader>
                        <form @submit.prevent="handleUpdate(row.id)">
                          <div class="flex flex-row gap-4">
                            <FormItem class="mt-2 w-full">
                              <label for="name">Name:</label>
                              <Input v-model="name" type="text" />
                            </FormItem>
                            <FormItem class="mt-2 w-full">
                              <label for="gender">Gender:</label>
                              <Select v-model="gender">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="male"> Male </SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">
                                      Others
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          </div>
                          <div class="flex flex-row gap-4">
                            <FormItem class="mt-2 w-full">
                              <label for="email">Email:</label>
                              <Input v-model="email" type="email" />
                            </FormItem>
                            <FormItem class="mt-2 w-full">
                              <label for="phone">Phone:</label>
                              <Input v-model="phone" type="text" />
                            </FormItem>
                          </div>
                          <FormItem class="mt-2">
                            <label for="address">Address:</label>
                            <Textarea v-model="address" type="text" />
                          </FormItem>
                          <div class="flex flex-row gap-4">
                            <FormItem class="mt-2 w-full">
                              <label for="photo">Photo:</label>
                              <Input type="file" @change="handleFileChange" />
                            </FormItem>
                            <FormItem class="mt-2 w-full flex flex-row gap-2">
                              <img
                                id="photo"
                                :src="`${DOMAIN}/customer/${selectFile}`"
                                alt="Image Preview"
                                class="h-[100px] rounded-lg mt-2"
                              />
                              <img
                                v-if(imgUrl)
                                :src="imgUrl"
                                class="h-[100px] rounded-lg mt-2"
                              />
                            </FormItem>
                          </div>
                          <FormItem class="mt-2 flex gap-2">
                            <DialogClose>
                              <Button
                                type="submit"
                                @click="
                                  () => {
                                    toast({
                                      title: 'Customer Updated Successfully',
                                      description: `on this day, ${datetime}`,
                                    });
                                  }
                                "
                              >
                                Submit
                              </Button>
                            </DialogClose>
                          </FormItem>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TooltipProvider>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger
                            ><Button>Delete</Button></TooltipTrigger
                          >
                          <TooltipContent>
                            <p>Delete Customer Information</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle
                          >Are you absolutely sure?</AlertDialogTitle
                        >
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your record and remove your data rom our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction @click="handleDelete(row.id)">
                          <Button
                            type="submit"
                            @click="
                              () => {
                                toast({
                                  title: 'Customer Deleted Successfully',
                                  description: `on this day, ${datetime}`,
                                });
                              }
                            "
                          >
                            Continue
                          </Button></AlertDialogAction
                        >
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  </div>
</template>
