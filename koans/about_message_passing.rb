class AboutMessagePassing < Neo::Koan

  class MessageCatcher
    def caught?
      true
    end
  end

  def test_methods_can_be_called_directly
    mc = MessageCatcher.new
    assert mc.caught?  # Directly calling the method
  end

  def test_methods_can_be_invoked_by_sending_the_message
    mc = MessageCatcher.new
    assert mc.send(:caught?)  # Using send to invoke the method
  end

  def test_methods_can_be_invoked_more_dynamically
    mc = MessageCatcher.new
    assert mc.send("caught?")  # Dynamically sending the method name
    assert mc.send("caught" + "?")  # Concatenating to create method name dynamically
    assert mc.send("CAUGHT?".downcase.to_sym)  # Making string lowercase and converting to symbol
  end

  def test_send_with_underscores_will_also_send_messages
    mc = MessageCatcher.new
    assert_equal true, mc.__send__(:caught?)  # __send__ is an alias for send

    # THINK ABOUT IT:
    #
    # Ruby provides both send and __send__ to prevent potential clashes with method names like "send".
  end

  def test_classes_can_be_asked_if_they_know_how_to_respond
    mc = MessageCatcher.new
    assert_equal true, mc.respond_to?(:caught?)  # mc responds to caught? method
    assert_equal false, mc.respond_to?(:does_not_exist)  # mc does not respond to this method
  end

  # ------------------------------------------------------------------

  class MessageCatcher
    def add_a_payload(*args)
      args
    end
  end

  def test_sending_a_message_with_arguments
    mc = MessageCatcher.new
    assert_equal [], mc.add_a_payload  # No arguments passed
    assert_equal [], mc.send(:add_a_payload)  # Same using send

    assert_equal [3, 4, nil, 6], mc.add_a_payload(3, 4, nil, 6)  # Arguments passed
    assert_equal [3, 4, nil, 6], mc.send(:add_a_payload, 3, 4, nil, 6)  # Same using send
  end

  # ------------------------------------------------------------------

  class TypicalObject
  end

  def test_sending_undefined_messages_to_a_typical_object_results_in_errors
    typical = TypicalObject.new
    exception = assert_raise(NoMethodError) do
      typical.foobar  # No method `foobar` defined
    end
    assert_match(/foobar/, exception.message)  # The error message should contain 'foobar'
  end

  def test_calling_method_missing_causes_the_no_method_error
    typical = TypicalObject.new
    exception = assert_raise(NoMethodError) do
      typical.method_missing(:foobar)  # Calling method_missing directly
    end
    assert_match(/foobar/, exception.message)  # The error message should contain 'foobar'
  end

  # ------------------------------------------------------------------

  class AllMessageCatcher
    def method_missing(method_name, *args, &block)
      "Someone called #{method_name} with <#{args.join(", ")}>"
    end
  end

  def test_all_messages_are_caught
    catcher = AllMessageCatcher.new
    assert_equal "Someone called foobar with <>", catcher.foobar  # Catching all messages dynamically
    assert_equal "Someone called foobaz with <1>", catcher.foobaz(1)  # Same with arguments
    assert_equal "Someone called sum with <1, 2, 3, 4, 5, 6>", catcher.sum(1,2,3,4,5,6)  # Same with arguments
  end

  def test_catching_messages_makes_respond_to_lie
    catcher = AllMessageCatcher.new
    assert_nothing_raised do
      catcher.any_method  # No exception raised for catching undefined method
    end
    assert_equal false, catcher.respond_to?(:any_method)  # respond_to? returns true for any method
  end

  # ------------------------------------------------------------------

  class WellBehavedFooCatcher
    def method_missing(method_name, *args, &block)
      if method_name.to_s[0,3] == "foo"
        "Foo to you too"
      else
        super(method_name, *args, &block)
      end
    end
  end

  def test_foo_methods_are_caught
    catcher = WellBehavedFooCatcher.new
    assert_equal "Foo to you too", catcher.foo_bar  # Method missing is caught for foo methods
    assert_equal "Foo to you too", catcher.foo_baz  # Same for other foo methods
  end

  def test_non_foo_messages_are_treated_normally
    catcher = WellBehavedFooCatcher.new
    assert_raise(NoMethodError) do
      catcher.normal_undefined_method  # Non-foo methods raise NoMethodError
    end
  end

  # ------------------------------------------------------------------

  # (note: just reopening class from above)
  class WellBehavedFooCatcher
    def respond_to?(method_name)
      if method_name.to_s[0,3] == "foo"
        true
      else
        super(method_name)
      end
    end
  end

  def test_explicitly_implementing_respond_to_lets_objects_tell_the_truth
    catcher = WellBehavedFooCatcher.new
    assert_equal true, catcher.respond_to?(:foo_bar)  # Explicitly handling foo methods
    assert_equal false, catcher.respond_to?(:something_else)  # Normal methods return false
  end

end
